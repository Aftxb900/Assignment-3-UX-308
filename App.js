import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { FAB, Portal, Modal, TextInput, Provider, Button } from "react-native-paper";

import { handleInput } from "./src/Order";
import { getPoints } from "./src/loyalty";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [points, setPoints] = useState(getPoints());

  const scrollViewRef = useRef();

  const openModal = () => {
    setVisible(true);

    // ✅ Auto welcome message
    if (messages.length === 0) {
      const welcome = handleInput("");
      setMessages(welcome);
    }
  };

  const closeModal = () => setVisible(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const response = handleInput(input);

    setMessages((prev) => [...prev, "You: " + input, ...response]);
    setInput("");

    // ✅ Update loyalty points
    setPoints(getPoints());
  };

  return (
    <Provider>
      <View style={styles.container}>
        
        {/* 🔹 Loyalty Points Display */}
        <Text style={styles.title}>🍔 Loyalty Points</Text>
        <Text style={styles.points}>{points}/10</Text>
        <Text style={styles.subtitle}>
          Order 10 times to get 1 FREE 🎁
        </Text>

        {/* 🔹 Chatbot Modal */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={closeModal}
            contentContainerStyle={styles.modal}
          >
            <Text style={styles.chatTitle}>🤖 Order Bot</Text>

            <ScrollView
              style={styles.chatBox}
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current?.scrollToEnd({ animated: true })
              }
            >
              {messages.map((msg, index) => (
                <Text key={index} style={styles.message}>
                  {msg}
                </Text>
              ))}
            </ScrollView>

            <TextInput
              mode="outlined"
              placeholder="Type your order..."
              value={input}
              onChangeText={setInput}
              style={styles.input}
            />

            <Button mode="contained" onPress={sendMessage}>
              Send
            </Button>
          </Modal>
        </Portal>

        {/* 🔹 Floating Action Button */}
        <FAB
          icon="chat"
          style={styles.fab}
          onPress={openModal}
        />

      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  points: {
    fontSize: 48,
    marginVertical: 10,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  modal: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 10,
    height: "70%",
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  message: {
    marginVertical: 4,
  },
  input: {
    marginBottom: 10,
  },
});