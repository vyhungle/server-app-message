module.exports.ValidateRegisterInput = (
  usernameData,
  username,
  password,
  email,
  confirmPassword
) => {
  var errors = {};
  if (username.trim() === "") {
    errors.username = "Tên đăng nhập không được để trống";
  } else if (username.length < 5) {
    errors.username = "Tên đăng nhập không được nhỏ hơn 5 ký tự";
  } else if (usernameData === username) {
    errors.username = "Tên người dùng này đã được sử dụng";
  }
  if (password.trim() === "") {
    errors.password = "Mật khẩu không được để trống";
  } else if (password.length < 5) {
    errors.password = "Mật khẩu không được nhỏ hơn 5 ký tự";
  } else if (password.trim() !== confirmPassword.trim()) {
    errors.comfirmPassword = "mật khẩu phải trùng khớp";
  }
  if (email.trim() === "") {
    errors.email = "Email không được để trống";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email phải là một địa chỉ email hợp lệ";
    }
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.ValidateLoginInput = (username, password) => {
  var errors = {};
  if (username.trim() === "") {
    errors.username = "Tên đăng nhập không được để trống";
  }
  if (password.trim() === "") {
    errors.password = "Mật khẩu không được để trống";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export function getIdRoom(from, to, room) {
  for (const r of room) {
    if (r.users[0].userId == from && r.users[1].userId == to) return r._id;
    if (r.users[1].userId == from && r.users[0].userId == to) return r._id;
  }
  return "";
}

export function checkIsRoom(id, room) {
  for (const item of room.users) {
    if (item.userId._id == id && item.exist == true) {
      return true;
    }
  }
  return false;
}
