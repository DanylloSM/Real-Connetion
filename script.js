const steps = document.querySelectorAll('.step');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progress = document.querySelector('.progress-fill');

let current = 0;

function updateStep() {
  steps.forEach(step => step.classList.remove('active'));
  steps[current].classList.add('active');

  const percent = (current / (steps.length - 1)) * 100;
  progress.style.width = percent + "%";
}

nextBtn.addEventListener('click', () => {
  const etapaAtual = steps[current];
  const opcoesContainer = etapaAtual.querySelector('.opcoes-container');

  if (opcoesContainer) {
    const minimo = Number(opcoesContainer.dataset.minimo);
    const selecionados = opcoesContainer.querySelectorAll('.opcao-btn.selecionado');

    if (selecionados.length < minimo) {
      alert(`Selecione no mínimo ${minimo} opções.`);
      return;
    }
  }

  if (current < steps.length - 1) {
    current++;
    updateStep();
  }
});

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    updateStep();
  }
});

document.querySelectorAll('.opcoes-container').forEach(container => {
  const botoes = container.querySelectorAll('.opcao-btn');
  const totalSelecionado = container.querySelector('.total-selecionado');
  const inputHidden = container.querySelector('.valores-selecionados');
  const campoOutros = container.querySelector('.campo-outros');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botao.classList.toggle('selecionado');

      const selecionados = Array.from(
        container.querySelectorAll('.opcao-btn.selecionado')
      ).map(item => item.dataset.value);

      totalSelecionado.textContent = selecionados.length;
      inputHidden.value = selecionados.join(',');

      if (campoOutros) {
        if (selecionados.includes('outros')) {
          campoOutros.classList.add('mostrar');
        } else {
          campoOutros.classList.remove('mostrar');
          campoOutros.value = '';
        }
      }
    });
  });
});
document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', () => {
    const campoOutro = select.parentElement.querySelector('.campo-outros-select');

    if (!campoOutro) return;

    if (select.value === 'outro') {
      campoOutro.classList.add('mostrar');
    } else {
      campoOutro.classList.remove('mostrar');
      campoOutro.value = '';
    }
  });
})
updateStep();