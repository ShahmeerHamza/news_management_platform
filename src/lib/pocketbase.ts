import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://127.0.0.1:8090');

// // Auto-refresh authentication
// pb.authStore.onChange(() => {
//   if (typeof window !== 'undefined') {
//     document.cookie = pb.authStore.exportToCookie({ 
//       secure: false, 
//       sameSite: 'lax' 
//     });
//   }
// });

// // Load auth from cookie on client side
// if (typeof window !== 'undefined') {
//   pb.authStore.loadFromCookie(document.cookie);
// }

export default pb;