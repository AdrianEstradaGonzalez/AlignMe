/**
 * 📍 ALERTA DE PERMISOS DE UBICACIÓN
 * ==================================
 * Se muestra cuando no se conceden permisos de ubicación y la app
 * necesita verificar la comunidad para permitir el acceso a funciones.
 */

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

interface Props {
  visible: boolean;
  onOpenSettings: () => void;
  onExit: () => void;
}

export default function LocationRequiredAlert({ visible, onOpenSettings, onExit }: Props) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onExit}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Permiso de Ubicación Requerido</Text>
          <Text style={styles.message}>
            Necesitamos verificar tu comunidad para acceder a las funciones de AlignMe. Por favor habilita los permisos de ubicación en los ajustes.
          </Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity style={[styles.button, styles.outline]} onPress={onOpenSettings} activeOpacity={0.8}>
              <Text style={styles.outlineText}>Abrir ajustes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.primary]} onPress={onExit} activeOpacity={0.8}>
              <Text style={styles.primaryText}>Salir</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.note}>
            Si no autorizas la ubicación, no podremos verificar tu federación y el acceso quedará restringido.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    color: '#111827',
  },
  message: {
    fontSize: 15,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 10,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  primary: {
    backgroundColor: '#dc2626',
  },
  outlineText: {
    color: '#111827',
    fontWeight: '700',
  },
  primaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  note: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
  },
});
