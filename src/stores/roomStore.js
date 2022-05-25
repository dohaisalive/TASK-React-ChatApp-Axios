import { makeObservable, observable, action } from "mobx";
import axios from "axios";
class RoomStore {
  rooms = [
    {
      image:
        "https://mk0peerspaceres622pi.kinstacdn.com/wp-content/uploads/Eco-Friendly-Executive-Boardroom-santa-monica-la-los-angeles-rental-1200x600.jpg",
      id: 1,
      title: "Meeting room",
      description: "Only people invited for the meeting!",
      slug: "meeting-room",
      messages: [
        {
          msg: "Hi Hacker, How are you?",
        },
        {
          msg: "I am fine.",
        },
      ],
    },
  ];

  constructor() {
    makeObservable(this, {
      rooms: observable,
      createRoom: action,
      updateRoom: action,
      deleteRoom: action,
      createMsg: action,
    });
  }

  fetchRoom = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      this.rooms = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  createRoom = async (room) => {
    this.rooms.push(room);
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        room
      );
    } catch (error) {
      console.error(error);
    }
  };

  deleteRoom = async (roomId) => {
    this.rooms = this.rooms.filter((element) => element.id !== roomId);
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  createMsg = (roomId, msg) => {
    const room = this.rooms.find((room) => room.id === +roomId);
    console.log(room);
    room.messages.push(msg);
  };

  updateRoom = async (updatedRoom) => {
    const room = this.rooms.find((room) => room.id === updatedRoom.id);
    room.title = updatedRoom.title;
    room.description = updatedRoom.description;
    room.image = updatedRoom.image;

    try {
      await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${updatedRoom.id}`,
        room
      );
    } catch (error) {
      console.error(error);
    }
  };
}

const roomStore = new RoomStore();
roomStore.fetchRoom(); //important!!!!! to render stuff!!!!
export default roomStore;
