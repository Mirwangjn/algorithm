/**
 * @param {number[]} nums
 * @return {number[][]}
 * 
 * 三数之和
 * 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请
 * 你返回所有和为 0 且不重复的三元组。
    注意：答案中不可以包含重复的三元组。
 * 编号: 15
 */
var threeSum = function (nums) {
    const result_arr = [];
    //排序
    nums.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < nums.length; i++) {
        //因为left和right一定比nums[i]大, 所以nums[i] > 0则之后一定没有想要的三元组
        if (nums[i] > 0) {
            return result_arr;
        }
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }
        //left和right作为下标会进行偏移所以用let
        let left = i + 1;
        let right = nums.length - 1;
        // 因为找三元组, 且i != left、i != right 且 left != right
        while (left < right) {
            const three_sum = nums[i] + nums[left] + nums[right];
            if (three_sum > 0) {
                // 大了
                right--;
            } else if (three_sum < 0) {
                left++;
            } else {
                result_arr.push([nums[i], nums[left], nums[right]]);
                //去重操作
                while (left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                /*
                            因为外层for循环, 一次不一定就只有一个三元组, 所以不能break
                            直接right--; left++; "因为在不考虑元素重复的情况下", 
                            只对一个数进行++操作, 三元素相加肯定不是0
                        */
                right--;
                left++;
            }
        }
    }
};
