/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let i = m-1, j = n-1, k = m+n-1;
    function push(n) {
        nums1[k--] = n;
    }
    while(i >= 0 && j >= 0) {
        if(nums1[i] > nums2[j]) {
            push(nums1[i--]);
        } else {
            push(nums2[j--]);
        }
    }
    while(i >= 0) push(nums1[i--]);
    while(j >= 0) push(nums2[j--]);
};
