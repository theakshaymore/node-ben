// Two-Sum (Streaming)
// Prompt: Given an incoming stream of integers, support add(x) and exists(target) to check if any pair sums to target.
// Signature:
// Example: add(1); add(3); add(5); exists(4) → true; exists(7) → false
// Constraints: O(1) amortized per add; O(n) per exists acceptable.

// class TwoSum {
//   add(x) {}
//   exists(target) {}
// }

// Merge Intervals
// Prompt: Merge overlapping intervals.
// Signature: function merge(intervals) {} // intervals: number[][]
// Example: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]

// intervals [1,2,3][2,3,4,5,6]
function merge(intervals) {
  let res = [];
  for (let i = 0; i < intervals.length; i++) {
    for (let j = i + 1; j < intervals.length; j++) {
      if (intervals[i][j]) res;
    }
  }
}
