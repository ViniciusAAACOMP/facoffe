const mockUser = require('./mockUser');

let is_subscribed = false;
let currentPlan = '';

const Unsubscribe = (user) => {
  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }
  is_subscribed = false;
  currentPlan = '';
  return { success: true, message: `Assinatura cancelada para o usuário ${user.nome}.` };
};


const Subscribe = (user, newPlan) => {
  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }
  is_subscribed = true;
  currentPlan = newPlan;
  return { success: true, message: `Assinatura realizada com sucesso para o usuário ${user.nome} ao plano ${newPlan}.` };
};
