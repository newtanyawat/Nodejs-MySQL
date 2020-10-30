
function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return Buffer.from(bitmap).toString('base64');
  }

  async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
}

  async function comparedHashPassword(password1,password2) {
    const isSame = await bcrypt.compare(password1,password2)
  }

  exports.base64_encode = base64_encode;
  exports.hashPassword = hashPassword;
  exports.comparedHashPassword = comparedHashPassword;

  