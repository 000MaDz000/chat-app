import isMeMember from "./is-me-member";

export default async function isMeAdmin(roomname: string) {
    return await isMeMember(roomname, true);
}