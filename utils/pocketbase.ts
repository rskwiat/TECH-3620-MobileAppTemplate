import Pocketbase from 'pocketbase';

export const pb = new Pocketbase('https://tech-3620-fall-2024.fly.dev');
pb.autoCancellation(false);

export function checkIfLoggedIn(): boolean {
  return pb.authStore.isValid;
}

export function logout() {
  pb.authStore.clear();
}

export function getPb() {
  return pb;
}
