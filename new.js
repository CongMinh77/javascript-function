//Lấy đuôi của file
function getExtensionFilename(filename) {
  return filename.split('.').pop();
}
// Đảo chuỗi
function reverse(str) {
  return str.split("").reverse().join("");
}
//Viết hoa chữ cái đầu từ
function capitalize(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
           return $1.toUpperCase();
       });
}
//Hàm bắt đầu bằng chuỗi
function startWith(str){
  return str.startsWith("Java", 2);
}
console.log(startWith('XPJava'));
// Xóa kí tự thứ N
function omitCharAt(str, n) {
  return str.substr(0, n) + str.substr(n+1);
}
//Kiểm tra 2 lượng kí tự
function equal_pt(str){ 
 if(str.replace(/[p]/g, "").length === str.replace(/[t]/g, "").length)
 {
     return true;
 }
 else
 {
     return false;
 }
}
/* Viết hàm pyString để tạo chuỗi mới thêm "Py" trước chuỗi nhập vào. 
Nếu chuỗi đã cho đã bắt đầu bằng "Py" thì hãy trả về chuỗi gốc (không cần thêm).
Tham số:
- String: chuỗi nhập vào lúc đầu.
*/
function pyString(String) {
  var x='Py';
  if(String.startsWith("Py"))
  {
      return String;
  }
  else{
     return x.concat(String);
  }
}
// Chia nhỏ mảng
function chunkArrayInGroups(arr, size){
    var results = [];
    while (arr.length) {
        results.push(arr.splice(0, size));
    }
    return results;
}
/*
Hãy viết một hàm để kiểm tra xem có thể sắp xếp các kí tự 
của 1 chuỗi String cho trước thành 1 chuỗi String cho trước khác không?
Input: abc cba
Output: True

Input: abx abb
Output: False
*/

function rearrangeChar(str1, str2) {
  var first_set = str1.split(''),
  second_set = str2.split(''),
  result = true;
  first_set.sort();
  second_set.sort();

  for (var i = 0; i < Math.max(first_set.length, second_set.length); i++) {
    if (first_set[i] !== second_set[i]) {
      result = false;
    }
  }
  return result;
}
// Tìm số xuất hiện nhiều nhất
function findMostFrequent(arr) {
  var empty = [];
  var x = arr.reduce((a, b, i, arr) =>
    (arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b),
    null)
  empty.push(x);
  return empty;
}
// viết hàm tạo mới một 1 string từ n ký tự từ vị trí đầu và cuối của chuỗi cũ
// newString("1wyg5yhd45", 2) // "1w45"
function newString(str, n){
    var x='';
    var strnew=x.concat(str.slice(0, n), str.slice(-n,str.length));
    return strnew;
}