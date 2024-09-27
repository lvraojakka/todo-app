function getIndexNumbersOfTheTargetedSum(nums, target) {
    if (!Array.isArray(nums) || nums.length < 2) {
        throw new Error("Input must be an array with at least two numbers.");
    }
    
    const numsInvertedObj = {};

    for (let i = 0; i < nums.length; i++) {
        const requiredValue = target - nums[i];
        
        if (numsInvertedObj.hasOwnProperty(requiredValue)) {
            return [numsInvertedObj[requiredValue], i];
        }
        
        numsInvertedObj[nums[i]] = i;
    }
    
    throw new Error("No two sum solution found.");
}

const nums = [2, 7, 11, 15];
const target = 17;

try {
    const result = getIndexNumbersOfTheTargetedSum(nums, target);
    console.log(result);
} catch (error) {
    console.error(error.message);
}
