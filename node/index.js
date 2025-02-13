const fs = require('fs').promises;

async function findLeftoverFood() {
    try {
        const animals = (await fs.readFile('animals.txt', 'utf8')).split('\n').filter(Boolean);
        const food = (await fs.readFile('food.txt', 'utf8')).split('\n').filter(Boolean);

        const dietMap = {
            'cat': ['fish'],
            'dog': ['dogfood'],
            'tiger': ['deer'],
            'rabbit': ['carrot'],
            'donkey': ['hay']
        };

        const consumedIndices = new Set();

        for (const animal of animals) {
            const acceptableFood = dietMap[animal];
            let foodFound = false;

            for (let i = 0; i < food.length; i++) {
                if (!consumedIndices.has(i) && acceptableFood.includes(food[i])) {
                    consumedIndices.add(i);
                    foodFound = true;
                    break;
                }
            }

            if (!foodFound) {
                console.warn(`Warning: No food found for ${animal}`);
            }
        }

        const leftover = food.filter((_, index) => !consumedIndices.has(index));

        return leftover.join('-');
    } catch (error) {
        console.error('Error processing files:', error);
        throw error;
    }
}

async function main() {
    try {
        const result = await findLeftoverFood();
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

main();