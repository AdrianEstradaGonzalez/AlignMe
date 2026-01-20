import CryptoJS from "crypto-js";

const QR_VERSION_PREFIX = "AM1:";

// Nota: Mantener este secreto privado dentro de la app.
const QR_SECRET = "alignme_v2_qr_secret_2026";

function createRandomIv(bytes: number): CryptoJS.lib.WordArray {
  try {
    return CryptoJS.lib.WordArray.random(bytes);
  } catch (error) {
    // Fallback no-criptográficamente seguro (útil para emulador/debug)
    console.warn("⚠️ Random seguro no disponible, usando Math.random para IV.", error);
    const randomBytes = new Uint8Array(bytes);
    for (let i = 0; i < bytes; i += 1) {
      randomBytes[i] = Math.floor(Math.random() * 256);
    }
    return CryptoJS.lib.WordArray.create(randomBytes as unknown as number[]);
  }
}

export type QrPayload = {
  modo: "6x6" | "4x4";
  codigoEquipo: string;
  valores: { [pos: string]: string };
};

export function encodeQrPayload(payload: QrPayload): string {
  const key = CryptoJS.SHA256(QR_SECRET);
  const iv = createRandomIv(16);
  const plaintext = JSON.stringify(payload);

  const encrypted = CryptoJS.AES.encrypt(plaintext, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const packed = {
    v: 1,
    iv: CryptoJS.enc.Base64.stringify(iv),
    ct: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
  };

  const packedJson = JSON.stringify(packed);
  const packedBase64 = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(packedJson)
  );

  return `${QR_VERSION_PREFIX}${packedBase64}`;
}

export function decodeQrPayload(data: string): QrPayload {
  if (!data || !data.startsWith(QR_VERSION_PREFIX)) {
    throw new Error("Formato QR no soportado");
  }

  const packedBase64 = data.slice(QR_VERSION_PREFIX.length);
  const packedJson = CryptoJS.enc.Utf8.stringify(
    CryptoJS.enc.Base64.parse(packedBase64)
  );

  const packed = JSON.parse(packedJson) as { v: number; iv: string; ct: string };

  if (!packed?.iv || !packed?.ct) {
    throw new Error("Datos QR incompletos");
  }

  const key = CryptoJS.SHA256(QR_SECRET);
  const iv = CryptoJS.enc.Base64.parse(packed.iv);
  const ciphertext = CryptoJS.enc.Base64.parse(packed.ct);

  const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });
  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  if (!plaintext) {
    throw new Error("No se pudo descifrar el QR");
  }

  const payload = JSON.parse(plaintext) as QrPayload;

  if (!payload?.modo || !payload?.valores) {
    throw new Error("Payload QR inválido");
  }

  return payload;
}
