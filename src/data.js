const stat = {"page": "land", "username": ""};

function updateStatus(newStatus){
    stat = newStatus;
}
function getStatus(){
    return stat;
}

export {updateStatus, getStatus};