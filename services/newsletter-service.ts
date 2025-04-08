export type NewsletterSubscriber = {
  email: string;
  subscribedAt: string;
  active: boolean;
};

/**
  Subscribe an email to the newsletter
 */
export async function subscribeToNewsletter(
  email: string
): Promise<NewsletterSubscriber> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Vérifier si l'email est déjà inscrit
  const subscribers = getSubscribers();
  const existingSubscriber = subscribers.find((sub) => sub.email === email);

  if (existingSubscriber) {
    if (existingSubscriber.active) {
      throw new Error("This email is already subscribed to our newsletter.");
    } else {
      // Réactiver l'abonnement
      existingSubscriber.active = true;
      saveSubscribers(subscribers);
      return existingSubscriber;
    }
  }

  // Créer un nouvel abonné
  const newSubscriber: NewsletterSubscriber = {
    email,
    subscribedAt: new Date().toISOString(),
    active: true,
  };

  // Ajouter à la liste et sauvegarder
  subscribers.push(newSubscriber);
  saveSubscribers(subscribers);

  return newSubscriber;
}

/**
 * Unsubscribe an email from the newsletter
 */
export async function unsubscribeFromNewsletter(email: string): Promise<void> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const subscribers = getSubscribers();
  const subscriberIndex = subscribers.findIndex((sub) => sub.email === email);

  if (subscriberIndex === -1) {
    throw new Error("This email is not subscribed to our newsletter.");
  }

  // Marquer comme inactif au lieu de supprimer
  subscribers[subscriberIndex].active = false;
  saveSubscribers(subscribers);
}

/**
  Get all newsletter subscribers
 */
export function getSubscribers(): NewsletterSubscriber[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedSubscribers = localStorage.getItem("newsletter_subscribers");
  if (!storedSubscribers) {
    return [];
  }

  try {
    return JSON.parse(storedSubscribers);
  } catch (error) {
    console.error("Error parsing newsletter subscribers:", error);
    return [];
  }
}

/**
 * Save subscribers to localStorage
 */
function saveSubscribers(subscribers: NewsletterSubscriber[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
}

/**
 * Get subscriber statistics
 */
export function getSubscriberStats() {
  const subscribers = getSubscribers();
  const activeSubscribers = subscribers.filter((sub) => sub.active);

  // Calculer les abonnés par mois (pour les 6 derniers mois)
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  const monthlySubscribers: Record<string, number> = {};

  // Initialiser les 6 derniers mois avec 0
  for (let i = 0; i < 6; i++) {
    const month = new Date();
    month.setMonth(now.getMonth() - i);
    const monthKey = `${month.getFullYear()}-${month.getMonth() + 1}`;
    monthlySubscribers[monthKey] = 0;
  }

  // Compter les abonnés par mois
  activeSubscribers.forEach((sub) => {
    const subDate = new Date(sub.subscribedAt);
    if (subDate >= sixMonthsAgo) {
      const monthKey = `${subDate.getFullYear()}-${subDate.getMonth() + 1}`;
      if (monthlySubscribers[monthKey] !== undefined) {
        monthlySubscribers[monthKey]++;
      }
    }
  });

  return {
    total: subscribers.length,
    active: activeSubscribers.length,
    inactive: subscribers.length - activeSubscribers.length,
    monthly: monthlySubscribers,
  };
}
