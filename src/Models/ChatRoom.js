import axios from 'axios';
import io, { Socket } from 'socket.io-client';
class ChatRoom {
    constructor(url,tripId){

    }

    static getSocket(tripId,onNewMessageRecived){
        const token = sessionStorage.getItem('token');
        console.log(token);
        if(token){
            const newSocket = io("http://localhost:3001",{
                query : {
                    token : token
                }
            })

            newSocket.nsp = '/chat';

            newSocket.on("disconnect", () => {
                console.log('disconnected')
                
              });
        
            newSocket.on("connect", () => {
                console.log('connected')
            });

            newSocket.emit('joinRoom',{
                tripId : tripId
            })

            newSocket.on('newMessage',onNewMessageRecived);
            return newSocket;
        }
        return;
    }

    static getSocketLocation(tripId,onNewLocation){
        const token = sessionStorage.getItem('token');
        const isAdmin = sessionStorage.getItem('isAdmin');
        console.log(token);
        if(token){
            const newSocket = io("http://localhost:3001",{
                query : {
                    token : token,
                    isAdmin : isAdmin
                }
            })

            newSocket.nsp = '/location';

            newSocket.on("disconnect", () => {
                console.log('disconnected')
                
              });
        
            newSocket.on("connect", () => {
                console.log('connected')
            });

            newSocket.emit('joinRoom',{
                tripId : tripId
            })

            newSocket.on('locationUpdated',onNewLocation);
            
            return newSocket;
        }
        return;
    }


}

export default ChatRoom;