 const avatar = document.getElementById('avatar');
 const modal = document.getElementById('avatar-modal');
 const closeModal = document.getElementById('close-modal');

 avatar.addEventListener('click', () => {
   modal.classList.remove('hidden');
 });

 closeModal.addEventListener('click', () => {
   modal.classList.add('hidden');
 });

 modal.addEventListener('click', (event) => {
   if (event.target === modal) {
     modal.classList.add('hidden');
   }
 });