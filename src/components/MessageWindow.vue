<template>
  <div class="chat">
    <div class="chat-title">
      <h1>Query Mate</h1>
      <h2>here to help</h2>
      <figure class="avatar">
        <img :src="data.botAvatar" />
      </figure>
    </div>
    <div class="messages">
      <div class="messages-content">
        <span v-for="message in data.messages">
          <div v-if="message.type === 'human'" class="message message-personal">
            {{ message.body }}
          </div>
          <div
            v-if="message.type === 'bot' || message.type === 'loading'"
            class="message new"
            :class="{
              'message new': true,
              loading: message.type === 'loading',
            }"
          >
            <figure class="avatar">
              <img :src="data.botAvatar" />
            </figure>
            <span v-if="message.type !== 'loading'">
              {{ message.body }}
            </span>
          </div>
        </span>
      </div>
    </div>
    <div class="message-box">
      <textarea
        rows="1"
        type="text"
        class="message-input"
        v-model="data.newMessage"
        placeholder="Type message..."
        @keypress.enter="insertMessage"
      ></textarea>
      <button type="submit" class="message-submit" @click="insertMessage">
        Send
      </button>
    </div>
  </div>
  <div class="bg"></div>
</template>

<script setup lang="ts" scoped>
import { ref, onMounted, computed, reactive } from "vue";
import openai from "openai";
import { requestSQL } from "@/api/gpt.api";
import { useTablesStore } from "@/stores/table-store";

const { tables, addTable, removeTable, removeAllTables } = useTablesStore();
interface message {
  type: string;
  body: any;
}
const data = reactive({
  newMessage: "Create a request",
  messages: [] as Array<message>,
  botAvatar:
    "https://media.istockphoto.com/id/1250000899/vector/chat-bot-robot-avatar-in-circle-round-shape-isolated-on-white-background-stock-vector.jpg?s=612x612&w=0&k=20&c=xj8GkmfFYH_Frho_pJ0HL2dkDwbZAI0Of6KwKdVsh1s=",
});

const insertMessage = () => {
  if (data.newMessage.length)
    data.messages.push({ type: "human", body: data.newMessage }),
      reply(data.newMessage),
      (data.newMessage = "");
};

const reply = async (message: string) => {
  if (tables.length) {
    //loading
    data.messages.push({
      type: "loading",
      body: "...",
    });

    //make api request
    const response = await requestSQL(
      `using the tables: ${tables.toString()}, create an SQL request: ${message}`
    );

    console.log(response);

    //cancel loading
    data.messages = data.messages.filter((m) => m.type !== "loading");
    //reply
    data.messages.push({
      type: "bot",
      body: response,
    });
    return;
  }
  //instruct to enter a table
  //reply
  data.messages.push({
    type: "bot",
    body: "Please enter at least one table name before continuing",
  });
};
</script>

<style lang="scss">
/*--------------------
Mixins
--------------------*/
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@mixin ball {
  @include center;
  content: "";
  display: block;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  z-index: 2;
  margin-top: 4px;
  animation: ball 0.45s cubic-bezier(0, 0, 0.15, 1) alternate infinite;
}

/*--------------------
Body
--------------------*/
*,
*::before,
*::after {
  box-sizing: border-box;
}

.bg {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background: url("https://images.unsplash.com/photo-1451186859696-371d9477be93?crop=entropy&fit=crop&fm=jpg&h=975&ixjsv=2.1.0&ixlib=rb-0.3.5&q=80&w=1925")
    no-repeat 0 0;
  filter: blur(80px);
  transform: scale(1.2);
}

/*--------------------
Chat
--------------------*/
.chat {
  width: 500px;
  height: 90vh;
  max-height: 500px;
  z-index: 2;
  overflow: hidden;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

/*--------------------
Chat Title
--------------------*/
.chat-title {
  flex: 0 1 75px;
  position: relative;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  color: #fff;

  text-align: left;
  padding: 15px 10px 10px 65px;

  h1 {
    font-size: 15px;
  }
  h1,
  h2 {
    font-weight: normal;

    margin: 0;
    padding: 0;
  }

  h2 {
    color: rgba(255, 255, 255, 0.5);
    font-size: 8px;
    letter-spacing: 1px;
    padding-left: 3px;
    font-size: 12px;
  }

  .avatar {
    position: absolute;
    z-index: 1;
    top: 13px;
    left: 9px;
    border-radius: 30px;
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.24);

    img {
      width: 100%;
      height: auto;
    }
  }
}

/*--------------------
Messages
--------------------*/
.messages {
  flex: 1 1 auto;
  color: rgba(255, 255, 255, 0.5);
  overflow-y: scroll;
  position: relative;
  width: 100%;

  & .messages-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 101%;
    width: 100%;
  }

  .message {
    clear: both;
    float: left;
    padding: 6px 10px 7px;
    border-radius: 10px 10px 10px 0;
    background: rgba(0, 0, 0, 0.3);
    margin: 8px 0;
    font-size: 11px;
    line-height: 1.4;
    margin-left: 45px;
    position: relative;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);

    .timestamp {
      position: absolute;
      bottom: -15px;
      font-size: 9px;
      color: rgba(255, 255, 255, 0.3);
    }

    &::before {
      content: "";
      position: absolute;
      bottom: -6px;
      border-top: 6px solid rgba(0, 0, 0, 0.3);
      left: 0;
      border-right: 7px solid transparent;
    }

    .avatar {
      position: absolute;
      z-index: 1;
      bottom: -15px;
      left: -35px;
      border-radius: 30px;
      width: 30px;
      height: 30px;
      overflow: hidden;
      margin: 0;
      padding: 0;
      border: 2px solid rgba(255, 255, 255, 0.24);

      img {
        width: 100%;
        height: auto;
      }
    }

    &.message-personal {
      float: right;
      color: #fff;
      text-align: right;
      background: linear-gradient(120deg, #248a52, #257287);
      border-radius: 10px 10px 0 10px;
      margin-right: 10px;
      &::before {
        left: auto;
        right: 0;
        border-right: none;
        border-left: 5px solid transparent;
        border-top: 4px solid #257287;
        bottom: -4px;
      }
    }

    &:last-child {
      margin-bottom: 30px;
    }

    &.new {
      transform: scale(0);
      transform-origin: 0 0;
      animation: bounce 500ms linear both;
    }

    &.loading {
      &::before {
        @include ball;
        border: none;
        animation-delay: 0.15s;
      }

      & span {
        display: block;
        font-size: 0;
        width: 20px;
        height: 10px;
        position: relative;

        &::before {
          @include ball;
          margin-left: -7px;
        }

        &::after {
          @include ball;
          margin-left: 7px;
          animation-delay: 0.3s;
        }
      }
    }
  }
}

/*--------------------
Message Box
--------------------*/
.message-box {
  flex: 0 1 40px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  padding: 10px;
  position: relative;

  & .message-input {
    background: none;
    border: none;
    outline: none !important;
    resize: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 11px;
    height: 100%;
    margin: 0;
    padding-right: 20px;
    width: 90%;
  }

  textarea:focus:-webkit-placeholder {
    color: transparent;
  }

  & .message-submit {
    position: absolute;
    z-index: 1;
    top: 9px;
    right: 10px;
    color: #fff;
    border: none;
    background: #248a52;
    font-size: 10px;
    text-transform: uppercase;
    line-height: 1;
    padding: 6px 10px;
    border-radius: 10px;
    outline: none !important;
    transition: background 0.2s ease;

    &:hover {
      background: #1d7745;
    }
  }
}

/*--------------------
Custom Srollbar
--------------------*/
.mCSB_scrollTools {
  margin: 1px -3px 1px 0;
  opacity: 0;
}

.mCSB_inside > .mCSB_container {
  margin-right: 0px;
  padding: 0 10px;
}

.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar {
  background-color: rgba(0, 0, 0, 0.5) !important;
}

/*--------------------
Bounce
--------------------*/
@keyframes bounce {
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  4.7% {
    transform: matrix3d(0.45, 0, 0, 0, 0, 0.45, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  9.41% {
    transform: matrix3d(0.883, 0, 0, 0, 0, 0.883, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  14.11% {
    transform: matrix3d(1.141, 0, 0, 0, 0, 1.141, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  18.72% {
    transform: matrix3d(1.212, 0, 0, 0, 0, 1.212, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  24.32% {
    transform: matrix3d(1.151, 0, 0, 0, 0, 1.151, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  29.93% {
    transform: matrix3d(1.048, 0, 0, 0, 0, 1.048, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  35.54% {
    transform: matrix3d(0.979, 0, 0, 0, 0, 0.979, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  41.04% {
    transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  52.15% {
    transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  63.26% {
    transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  85.49% {
    transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

@keyframes ball {
  from {
    transform: translateY(0) scaleY(0.8);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>
