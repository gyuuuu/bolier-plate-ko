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
        maxlength: 10
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

userSchema.method.comparePassword = function(plainPassword, cb){
    // ex) plainPassword =  1234567    암호화된 비번 : $2b$10$VK/CCfJjaZanIQsO0AR40eRlckLa0ExNJD48X28SqVN8mc5ulzOoy
    // plainPassword를 암호화해서 DB에 암호화된 비번과 같은 지 확인
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err); //비밀번화가 같지 않다면
        cb(null, isMatch);
    })
}

userSchema.method.generateToken = function(cb) {

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

const User = mongoose.model('User', userSchema)

module.exports = { User }