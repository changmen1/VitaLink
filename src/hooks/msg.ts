// TODO ----------------------------------------------H5 系统通知发送----------------------------------------------

const handleTest = (name: string, msg: string) => {
    new Notification(name, {
        body: msg,
    })
}

const handleTest2 = (name: string, msg: string) => {
    new Notification(name, {
        body: msg,
    })
}

export { handleTest, handleTest2 }

