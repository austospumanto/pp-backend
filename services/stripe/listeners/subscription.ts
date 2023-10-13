import * as StripeTypes from '$services/stripe/types';
import prisma from '$prisma/client';

class Subscription {
  static async created(event: StripeTypes.CustomerSubscriptionEvent) {
    // Change user's membership status to active

    // 1. Get the user's auth_id from the event's data
    const auth_id: string = event.data.object.customer as string;

    // 2. Update the user's membership status to active
    await prisma.user.update({
      data: { membership_status: 'ACTIVE' },
      where: { auth_id },
    });
  }

  static async updated(event: StripeTypes.CustomerSubscriptionEvent) {
    // Change user's membership based on the event's data

    // 1. Get the user's auth_id from the event's data
    const auth_id: string = event.data.object.customer as string;

    // 2. Get the subscription's status from the event's data
    const status: string = event.data.object.status as string;
    const statusIsActive = status === 'active';

    // 3. Update the user's membership status based on the subscription's status
    await prisma.user.update({
      data: { membership_status: statusIsActive ? 'ACTIVE' : 'INACTIVE' },
      where: { auth_id },
    });
  }

  static async deleted(event: StripeTypes.CustomerSubscriptionEvent) {
    // Change user's membership status to inactive

    // 1. Get the user's auth_id from the event's data
    const auth_id: string = event.data.object.customer as string;

    // 2. Update the user's membership status to inactive
    await prisma.user.update({
      data: { membership_status: 'INACTIVE' },
      where: { auth_id },
    });
  }
}

export default Subscription;
