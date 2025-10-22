import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StatusModal = ({
  visible,
  type = 'success', // 'success' | 'error' | 'warning'
  message = '',
  onClose,
  buttonText = 'OK',
}) => {
  const getModalConfig = () => {
    switch (type) {
      case 'success':
        return { color: '#4CAF50', icon: 'check-circle', title: 'Sucesso!' };
      case 'error':
        return { color: '#F44336', icon: 'error', title: 'Erro!' };
      case 'warning':
        return { color: '#FFC107', icon: 'warning', title: 'Atenção!' };
      default:
        return { color: '#2196F3', icon: 'info', title: 'Info' };
    }
  };

  const { color, icon, title } = getModalConfig();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Icon name={icon} size={60} color={color} style={styles.icon} />
          <Text style={[styles.title, { color }]}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 8,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default StatusModal;
