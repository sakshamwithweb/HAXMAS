// const hoverMessage = document.getElementById("messageHover")
// const message = document.getElementById("message")
// hoverMessage.addEventListener("mouseover", () => message.innerText = "(So, some younger elves were pretending to be devs and purged all christmas gift receivers' DB. Now, everyone must have to enter their names and refer to everyone.)")
// hoverMessage.addEventListener("mouseleave", () => message.innerText = "")
const button = document.getElementById("submit")
const form = document.getElementsByTagName("form")[0]
const list = document.getElementsByClassName("list")[0]

const loadNames = async () => {
    const req = await fetch("/api/names")
    const res = await req.json()
    return res
}

const addName = async (name, gift) => {
    const req = await fetch("/api/names", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ name: name, gift: gift })
    })
    const res = await req.json()
    return res
}

loadNames().then((res) => {
    res.forEach((i) => {
        const name = `<div class="flex"><p>${i.name}<p/>: <span class="font-bold">${i.gift}</span></div>`
        list.innerHTML = list.innerHTML + name
    })
})

button.onclick = () => {
    if (form.elements.name.value.length < 3 || form.elements.gift.value.length < 3) return

    button.disabled = true
    button.classList.add("disabled")
    // real stuff
    const name = `<div class="flex"><p>${form.elements.name.value}<p/>: <span class="font-bold">${form.elements.gift.value}</span></div>`
    addName(form.elements.name.value, form.elements.gift.value).then((res) => {
        if (res.success) {
            list.innerHTML = list.innerHTML + name
            form.reset()
            button.disabled = false
            button.classList.remove("disabled")
        }
    })
}