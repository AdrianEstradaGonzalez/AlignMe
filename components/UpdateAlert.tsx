import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';
import { Text, Button } from 'react-native-paper';

interface UpdateAlertProps {
  visible: boolean;
  title: string;
  message: string;
  androidUrl: string;
  iosUrl: string;
  mandatory?: boolean;
}

const UpdateAlert: React.FC<UpdateAlertProps> = ({
  visible,
  title,
  message,
  androidUrl,
  iosUrl,
  mandatory = false
}) => {
  const handleUpdate = () => {
    const storeUrl = Platform.OS === 'ios' ? iosUrl : androidUrl;
    Linking.openURL(storeUrl).catch(err => {
      console.error('Error al abrir la tienda:', err);
    });
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        // Bloquear completamente el cierre si es obligatoria
      }}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleUpdate}
              style={styles.updateButton}
              labelStyle={styles.updateButtonText}
            >
              Actualizar Ahora
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  alertContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxWidth: 400,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  content: {
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 0,
  },
  updateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 4,
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  laterButton: {
    marginTop: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  laterText: {
    fontSize: 14,
    color: '#666666',
  },
});

export default UpdateAlert;
