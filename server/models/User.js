const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        //salt 생성 (saltRounds가 필요)
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err) //에러 발생시

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
                // Store hash in your password DB.
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    // ex) plainPassword =  1234567    암호화된 비번 : $2b$10$VK/CCfJjaZanIQsO0AR40eRlckLa0ExNJD48X28SqVN8mc5ulzOoy
    // plainPassword를 암호화해서 DB에 암호화된 비번과 같은 지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err); //비밀번화가 같지 않다면
        cb(null, isMatch);
    })
}

userSchema.methods.generateToken = function(cb) {

    var user = this;

    // jsonwebtoken을 이용해서 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //user._id + 'secretToken' = token

    user.token = token //db의 token필드에 생성한 token 넣어주기
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // decode하면 유저 아이디가 나온다 -> decoded는 유저 아이디
        // 유저 아이디를 이용해서 유저를 찾은 다음 
        // 클라이언트에서 가져온 토큰과 DB에 저장된 토큰이 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }