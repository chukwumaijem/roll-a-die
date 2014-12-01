import std.algorithm;
import std.array;
import std.math;
import std.stdio;

void main() {
    const float step = 0.001;
    const float floor = 0.2;
    const float e = 0.6;
    const float mu = 0.8;
    const float tmax = 3;

    auto file = File("anim.css", "w");

    float[2][101] results;

    float[2] x = [0, 0];
    float[2] v = [0.1, -0.1];
    float[2] a = [0, 9.81];

    uint st = 0;
    for (float t = 0; t < tmax; t += step) {
        x[] += v[] * step;
        v[1] += a[1] * step;

        writeln(x, v);

        auto p = cast(uint)ceil(t / tmax * 100);
        results[p][] = x[];

        if (x[1] >= floor) {
            x[1] = floor;
            v[1] *= -e;

            v[0] *= mu;
        }

        foreach (ref v_; v) {
            if (abs(v_) < 0.005) {
                v_ = 0;
            }
        }

        if (st == 0 && abs(v[1]) < 0.04) {
            st = p;
        }
    }
    writeln(st);

    auto data = results;
    file.writeln("@keyframes dice-movement {");
    foreach (p, pos; data) {
        file.writefln("\t%s%% { transform: rotateX(-55deg) rotateY(45deg) translate(%spx, %spx) rotateZ(%sdeg) rotateY(%sdeg); }",
                p,
                cast(int)(pos[0] * 1000), cast(int)(pos[1] * 1000),
                -cast(int)max((20. - p) * 10, 0),
                cast(int)max((20. - p) * 5, 0)
                );
    }
    file.writeln("}");
    file.writeln("@-webkit-keyframes dice-movement {");
    foreach (p, pos; data) {
        file.writefln("\t%s%% { transform: rotateX(-55deg) rotateY(45deg) translate(%spx, %spx) rotateZ(%sdeg) rotateY(%sdeg); }",
                p,
                cast(int)(pos[0] * 1000), cast(int)(pos[1] * 1000),
                -cast(int)max((20. - p) * 10, 0),
                cast(int)max((20. - p) * 5, 0)
                );
    }
    file.writeln("}");
};
