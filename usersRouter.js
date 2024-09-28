const express = require('express');
const userDBC = require('./usersDBC');
const router = express.Router();


function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatRecipt(Receipt){
    let ReceiptRes;
    if (Receipt === null) {
        ReceiptRes = "대기";  // You can change this to whatever suits your needs
    } else if (Receipt === 1) {
        ReceiptRes = "완료";
    } else if (Receipt === 0) {
        ReceiptRes = "불가";
    } 

    return ReceiptRes;
}


router.post('/Received/:NUID', async (req, res) => {
    const res_signup = {
        status_code: 500
    };

    try {
        const NUID = req.params.NUID;  
        const rows = await userDBC.Received(NUID);
 
        if (rows.affectedRows > 0) {
            res_signup.status_code = 200;  
        } else {
            res_signup.status_code = 201;  
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        res.json(res_signup);
    }
});

router.post('/NotReceived/:NUID', async (req, res) => {
    const res_signup = {
        status_code: 500
    };

    try {
        const NUID = req.params.NUID;  
        const rows = await userDBC.NotReceived(NUID);
 
        if (rows.affectedRows > 0) {
            res_signup.status_code = 200;  
        } else {
            res_signup.status_code = 201;  
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        res.json(res_signup);
    }
});

router.post('/minusQuantity', async (req, res) => {
    const res_signup = {
        status_code: 500
    };

    try {
        const rows = await userDBC.minusQuantity();
 
        if (rows.affectedRows > 0) {
            res_signup.status_code = 200;  
        } else {
            res_signup.status_code = 201;  
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        res.json(res_signup);
    }
});

router.post('/setQuantity/:num', async (req, res) => {
    const res_signup = {
        status_code: 500
    };

    try {
        const num = req.params.num;
        const rows = await userDBC.setQuantity(num);
 
        if (rows.affectedRows > 0) {
            res_signup.status_code = 200;  
        } else {
            res_signup.status_code = 201;  
        }
    } catch (err) {
        console.log(err.message);
    } finally {
        res.json(res_signup);
    }
});



// router.post('/insertUser', async(req, res)=>{
//     const res_signup = {
//         status_code : 500
//     };

//     try{
//         const {Id, Major, Name, Time} =  req.body;
//         const rows = await userDBC.insertUser([Id, Major, Name, Time]);
//         if(rows.affectedRows > 0){
//             res_signup.status_code = 200;
//         }else{
//             res_signup.status_code = 201;
//         }
//     }catch(err)
//     {
//         console.log(err.message);
//     }finally{
//         res.json(res_signup);
//     }
// });

// router.post('/deleteUser', async(req, res)=>{
//     const res_delete_user = {
//         status_code : 500
//     };

//     try{
//         const {Id} =  req.body;
//         const rows = await userDBC.deleteUser([Id]);
//         if(rows.affectedRows > 0){
//             res_delete_user.status_code = 200;
//         }else{
//             res_delete_user.status_code = 201;
//         }
//     }catch(err)
//     {
//         console.log(err.message);
//     }finally{
//         res.json(res_delete_user);
//     }
// });

// router.post('/updateUser', async(req, res)=>{
//     const res_update_user = {
//         status_code : 500
//     };

//     try{
//         const {Id, Major, Name, Time} =  req.body;
//         const rows = await userDBC.updateUser(Id, Major, Name, Time);
//         if(rows.affectedRows > 0){
//             res_update_user.status_code = 200;
//         }else{
//             res_update_user.status_code = 201;
//         }
//     }catch(err)
//     {
//         console.log(err.message);
//     }finally{
//         res.json(res_update_user);
//     }
// });

module.exports = router; // 이 라우터를 외부로 보냄