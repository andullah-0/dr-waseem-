/**
 * Firebase Client Configuration & Service Initializer
 * Dr. Waseem Allergy Clinic
 */

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';
import appletConfig from '../firebase-applet-config.json';

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || appletConfig.firestoreDatabaseId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or network is unreachable.');
    }
    return false;
  }
}

export interface AppointmentData {
  id?: string;
  patientName: string;
  phone: string;
  age: string;
  preferredDate: string;
  problemDescription: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  userId: string;
  userEmail?: string;
  createdAt: any;
}

export interface ReviewData {
  id?: string;
  authorName: string;
  rating: number;
  comment: string;
  tag?: string;
  userId: string;
  createdAt: any;
}

export async function createAppointment(data: Omit<AppointmentData, 'id' | 'createdAt' | 'status'>): Promise<string> {
  const path = 'appointments';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...data,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateAppointmentStatus(appointmentId: string, status: AppointmentData['status']): Promise<void> {
  const path = `appointments/${appointmentId}`;
  try {
    const docRef = doc(db, 'appointments', appointmentId);
    await updateDoc(docRef, { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function fetchAppointments(userId?: string, isAdmin: boolean = false): Promise<AppointmentData[]> {
  const path = 'appointments';
  try {
    let q;
    if (isAdmin) {
      q = query(collection(db, path), orderBy('createdAt', 'desc'));
    } else if (userId) {
      q = query(collection(db, path), where('userId', '==', userId));
    } else {
      return [];
    }
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as AppointmentData));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function createReview(data: Omit<ReviewData, 'id' | 'createdAt'>): Promise<string> {
  const path = 'reviews';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeToReviews(callback: (reviews: ReviewData[]) => void): () => void {
  const path = 'reviews';
  const q = query(collection(db, path), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const reviews = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ReviewData));
      callback(reviews);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
}

export async function logOut() {
  await signOut(auth);
}
