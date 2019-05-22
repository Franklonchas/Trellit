<template>
    <div>
        <beautiful-chat
                :participants="participants"
                :titleImageUrl="titleImageUrl"
                :onMessageWasSent="onMessageWasSent"
                :messageList="messageList"
                :newMessagesCount="newMessagesCount"
                :isOpen="isChatOpen"
                :close="closeChat"
                :open="openChat"
                :showEmoji="false"
                :showFile="false"
                :showTypingIndicator="showTypingIndicator"
                :colors="colors"
                :alwaysScrollToBottom="alwaysScrollToBottom"
                :messageStyling="messageStyling"
                @onType="handleOnType"/>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: 'chatroom',
        data() {
            return {
                participants: [],
                titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
                messageList: [],
                newMessagesCount: 0,
                isChatOpen: false,
                showTypingIndicator: '',
                localNameMe: '',
                colors: {
                    header: {
                        bg: '#4e8cff',
                        text: '#ffffff'
                    },
                    launcher: {
                        bg: '#4e8cff'
                    },
                    messageList: {
                        bg: '#ffffff'
                    },
                    sentMessage: {
                        bg: '#4e8cff',
                        text: '#ffffff'
                    },
                    receivedMessage: {
                        bg: '#eaeaea',
                        text: '#222222'
                    },
                    userInput: {
                        bg: '#f4f7f9',
                        text: '#565867'
                    }
                },
                alwaysScrollToBottom: false,
                messageStyling: true,
            }
        },
        methods: {
            sendMessage(text) {
                if (text.length > 0) {
                    this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1;
                    this.onMessageWasSent({author: 'support', type: 'text', data: {text}})
                }
            },
            onMessageWasSent(message) {
                firebase.database().ref('chatroom/' + this.$route.params.id).push({
                    author: this.localNameMe,
                    text: message.data.text,
                }).then(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Mensaje enviado.',
                        text: '',
                        type: 'success',
                        position: 'top left',
                        duration: 3500,
                        speed: 1500
                    });
                });
                //this.messageList = [...this.messageList, message]
            },
            openChat() {
                // called when the user clicks on the fab button to open the chat
                this.isChatOpen = true;
                this.newMessagesCount = 0;
            },
            closeChat() {
                this.isChatOpen = false;
            },
            handleScrollToTop() {
            },
            handleOnType() {
                //console.log('Emit typing event');
            },
            loadMessages: function (message) {
                this.messageList = [];
                this.getLocalName();
                for (let key in message) {
                    if (this.localNameMe === message[key].author) {
                        this.messageList.push({
                            type: 'text',
                            author: 'me',
                            data: {
                                text: 'Yo: ' + message[key].text,
                            }
                        })
                    } else if (this.localNameMe !== message[key].author) {
                        this.messageList.push({
                            type: 'text',
                            author: message[key].author,
                            data: {
                                text: message[key].author + ': ' + message[key].text,
                            }
                        })
                    }
                }
                //console.log(this.messageList);
                return this.messageList;
            },
            getLocalName: function () {
                this.localNameMe = '';
                let localName;
                localName = localStorage.getItem('sesion_activa');

                for (let i = 21; i < localName.length; i++) {
                    this.localNameMe += localName[i];
                }
                return this.localNameMe;
            }
        },
        mounted() {
            firebase.database().ref('chatroom/' + this.$route.params.id).on('value', snapshots => this.loadMessages(snapshots.val()));
            this.getLocalName();
        }
    }
</script>

<style scoped>

</style>
