import { atom } from "recoil";

export const receiverState = atom({
    key : "receiver",
    default : ""
});

export const receiverNameState = atom({
    key : "receiverName",
    default : ""
});

export const senderIdAtom = atom({
    key : "senderIdAtom",
    default : ''
})

export const amountState = atom({
    key : "amountState",
    default : 0
});

export const balanceAtom = atom({
    key : "balanceAtom",
    default : true
})
