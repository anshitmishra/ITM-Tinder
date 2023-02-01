import io, { Socket } from 'socket.io-client';
const socket = io("https://itm.comradehub.com:8001");
export default socket;