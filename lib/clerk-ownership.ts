import 'server-only';

import { currentUser } from '@clerk/nextjs/server';

function parseOwnerValues(value?: string) {
  return new Set(
    (value ?? '')
      .split(',')
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
}

const ownerUserIds = parseOwnerValues(process.env.OSTRA_OWNER_CLERK_USER_IDS);
const ownerEmails = parseOwnerValues(process.env.OSTRA_OWNER_EMAILS);

export async function getCurrentOwnerContext() {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress?.toLowerCase() ?? '';
  const isOwner = Boolean(user && (ownerUserIds.has(user.id.toLowerCase()) || ownerEmails.has(email)));

  return {
    user,
    isOwner,
  };
}
