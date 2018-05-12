import chartFactory from '../common/index';
import * as d3 from 'd3';

const ulamSpiral = ((enabled) => {
    const chart = chartFactory();

    const generateSpiral = (n) => {
        const spiral = [];

        // current position
        let x = 0;
        let y = 0;
        
        // when to turn
        const min = [0, 0];
        const max = [0, 0];
        
        let add = [0, 0];
        let direction = 0;
        const directions = {
            up: [0, -1],
            left: [-1, 0],
            down: [0, 1],
            right: [1, 0],
        };

        d3.range(1, n).forEach((i) => {
            spiral.push({x, y, n: i})
            add = directions[['up', 'left', 'down', 'right'][direction]];
            x += add[0];
            y += add[1];

            if (x < min[0]) {
                direction = (direction + 1) % 4;
                min[0] = x;
            }
            if (x > max[0]) {
                direction = (direction + 1) % 4;
                max[0] = x;
            }
            if (y < min[1]) {
                direction = (direction + 1) % 4;
                min[1] = y;
            }
            if (y > max[1]) {
                direction = (direction + 1) % 4;
                max[1] = y;
            }
        });

        return spiral;
    };

    const dot = d3.symbol().type(d3.symbolCircle).size(3);
    const center = 400;
    const l = 2;
    const x = (x, l) => center + (l * x);
    const y = (y, l) => center + (l * y);

    function generatePrimes(n) {
        function* numbers(start) {
            while (true) {
                yield start++;
            }
        }
        function* primes() {
            var seq = numbers(2);
            seq = filter(seq, prime);
            var prime;
            while (true) {
                prime = seq.next().value;
                yield prime;
            }
        }
        function* getPrimes(count, seq) {
            while (count) {
                yield seq.next().value;
                count--;
            }
        }

        let results = [];
        for (let prime of getPrimes(n, primes())) {
            results.push(prime);
        }
        return results;

        function* filter(seq, prime) {
            for (let num of seq) {
                if (num % prime !== 0) {
                    yield num;
                }
            }
        }
    }
    
    const primes = generatePrimes(2000);
    const sequence = generateSpiral(d3.max(primes));

})(true);