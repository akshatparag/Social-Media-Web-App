const development = {
    name:'development',
    asset_path:'/assets',
    session_cookie_key: 'blahsomething',
    db:'codeial_development',
    smtp:{
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth: {
        user: 'akshatparagg@gmail.com',
        pass: 'aiwuiimxxberswkw'
        }
    },
    google_client_id:"637407858554-460h38sdfe1c5m3vepnmprbu487am1ga.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial'
}

const production = {
    name:'production'
}

module.exports = development;