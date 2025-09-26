export const mockProducts = {
  'guide-gratuit': {
    id: 'guide-gratuit',
    title: '6 étapes pour cultiver tes micro-pousses maison',
    type: 'guide',
    description: 'Guide PDF gratuit pour débuter avec les micro-pousses',
    downloadUrl: '#',
    content: 'Guide complet de 20 pages avec illustrations'
  },
  'livre-digital': {
    id: 'livre-digital',
    title: 'Ton Jardin Micro-Pousses Maison',
    type: 'ebook',
    price: 17,
    description: 'Livre digital complet sur la culture des micro-pousses',
    downloadUrl: '#',
    content: 'Livre de 150 pages avec photos et recettes'
  },
  'formation-video': {
    id: 'formation-video',
    title: 'Formation Vidéo Complète Micro-Pousses',
    type: 'course',
    price: 67,
    description: 'Formation vidéo complète en 6 modules',
    videoUrl: '#',
    content: '6 heures de formation + bonus PDF'
  }
};

export const mockTestimonials = [
  {
    id: 1,
    name: 'Marie L.',
    text: 'Grâce au guide, j\'ai réussi mes premières micro-pousses en seulement 7 jours ! Incroyable.',
    rating: 5
  },
  {
    id: 2,
    name: 'Thomas B.',
    text: 'Le livre est très bien fait, même en appartement c\'est possible. Mes enfants adorent !',
    rating: 5
  },
  {
    id: 3,
    name: 'Sophie M.',
    text: 'La formation vidéo m\'a vraiment aidée à comprendre toutes les étapes. Je recommande !',
    rating: 5
  }
];

export const mockLeads = [];

export const submitLead = (leadData) => {
  // Mock function to simulate lead capture
  console.log('Lead captured:', leadData);
  mockLeads.push({
    ...leadData,
    id: Date.now(),
    timestamp: new Date()
  });
  return Promise.resolve({ success: true });
};

export const mockPurchase = (productId, userEmail) => {
  // Mock function to simulate purchase
  console.log('Purchase made:', { productId, userEmail });
  return Promise.resolve({ 
    success: true, 
    transactionId: 'mock_' + Date.now(),
    product: mockProducts[productId]
  });
};