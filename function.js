//Lấy đuôi của file
function getExtensionFilename(filename) {
  return filename.split(".").pop();
}

// Đảo chuỗi
function reverse(str) {
  return str.split("").reverse().join("");
}

//Viết hoa chữ cái đầu từ
function capitalize(str) {
  return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
    return $1.toUpperCase();
  });
}

//Hàm bắt đầu bằng chuỗi
function startWith(str) {
  return str.startsWith("Java", 2);
}
console.log(startWith("XPJava"));

// Xóa kí tự thứ N
function omitCharAt(str, n) {
  return str.substr(0, n) + str.substr(n + 1);
}

//Kiểm tra 2 lượng kí tự
function equalPt(str) {
  if (str.replace(/[p]/g, "").length === str.replace(/[t]/g, "").length) {
    return true;
  } else {
    return false;
  }
}

/* Hàm pyString để tạo chuỗi mới thêm "Py" trước chuỗi nhập vào.
 */
function pyString(String) {
  const x = "Py";
  if (String.startsWith("Py")) {
    return String;
  } else {
    return x.concat(String);
  }
}
// Chia nhỏ mảng
function chunkArrayInGroups(arr, size) {
  const results = [];
  while (arr.length) {
    results.push(arr.splice(0, size));
  }
  return results;
}

/*
Hàm để kiểm tra xem có thể sắp xếp các kí tự của 1 chuỗi String cho trước thành 1 chuỗi String cho trước khác không?

Input: abc cba
Output: True

Input: abx abb
Output: False
*/

function rearrangeChar(str1, str2) {
  const first_set = str1.split(""),
    second_set = str2.split(""),
    result = true;
  first_set.sort();
  second_set.sort();

  for (const i = 0; i < Math.max(first_set.length, second_set.length); i++) {
    if (first_set[i] !== second_set[i]) {
      result = false;
    }
  }
  return result;
}

// Tìm số xuất hiện nhiều nhất
function findMostFrequent(arr) {
  const empty = [];
  const x = arr.reduce(
    (a, b, i, arr) => (arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length ? a : b),
    null
  );
  empty.push(x);
  return empty;
}

// Hàm tạo mới một 1 string từ n ký tự từ vị trí đầu và cuối của chuỗi cũ
// Ex: newString("1wyg5yhd45", 2) // "1w45"
function newString(str, n) {
  const x = "";
  const strNew = x.concat(str.slice(0, n), str.slice(-n, str.length));
  return strNew;
}
