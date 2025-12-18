/**
 * 🚫 ALERTA DE ACCESO DENEGADO
 * =============================
 * Alerta que se muestra cuando una federación no tiene derechos de AlignMe.
 */

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

interface AccessDeniedAlertProps {
  visible: boolean;
  communityName?: string;
  onClose: () => void;
}

export default function AccessDeniedAlert({
  visible,
  communityName = 'tu federación',
  onClose,
}: AccessDeniedAlertProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.alertContainer}>
          {/* Icono de advertencia */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>⚠️</Text>
            </View>
          </View>

          {/* Título */}
          <Text style={styles.title}>
            Acceso Restringido
          </Text>

          {/* Mensaje */}
          <Text style={styles.message}>
            Lo sentimos, {communityName} no tiene los derechos de AlignMe.
          </Text>

          <Text style={styles.submessage}>
            Por favor, contacta con tu federación para más información. Si necesitas asistencia, visita bluedebug.com.
          </Text>

          {/* Botón Cerrar */}
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              Entendido
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  alertContainer: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 20,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef3c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    color: '#374151',
    marginBottom: 12,
  },
  submessage: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    color: '#6b7280',
    marginBottom: 28,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: '#dc2626',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
  },
});
