
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    startGame: startGame
  }
};

// Inicializar o jogo
const game = new Phaser.Game(config);

// Variáveis globais para controlar as escolhas do jogador
let choiceASelected = false;
let choiceBSelected = false;

// Função de pré-carregamento de recursos
function preload() {
  // Carregar imagens
  this.load.image('background', 'fundo.png');
}


function create(){
    this.scene.start('Menu');
}



// Função para começar o jogo
function startGame() {
    // Ir para a cena principal
    this.scene.start('Menu');
  }
  





// Adicionar uma nova cena para a cena principal
class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // Carregar imagens
    this.load.image('background', 'fundo.png');
  }

  create() {
    // Adicionar imagem de fundo
    this.add.image(400, 300, 'background');

    // Array de strings para o diálogo
    let dialogue;
    if (choiceASelected) {
      dialogue = [
        "Você escolheu a opção A.",
        "Este é o enredo para a opção A.",
        "Espero que você goste!"
      ];
      
    } else if (choiceBSelected) {
      dialogue = [
        "Você escolheu a opção B.",
        "Este é o enredo para a opção B.",
        "Espero que você goste!"
      ];
    }

    // Adicionar texto
    this.text = this.add.text(50, 50, '', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });

    // Exibir o primeiro texto
    this.text.setText(dialogue[0]);

    // Variável para controlar o índice do diálogo
    let dialogueIndex = 0;

    // Adicionar evento de clique do mouse para avançar o texto
    this.input.on('pointerdown', () => {
      dialogueIndex++;

      // Verificar se há mais texto para exibir
      if (dialogueIndex < dialogue.length) {
        // Exibir o próximo texto
        this.text.setText(dialogue[dialogueIndex]);
      } else {
        // Se não houver mais texto, encerrar o jogo
        this.text.setText('Voce terminou, clique para voltar ao menu!');
        this.scene.start('Menu');
      }
    });
  }
}


class Menu extends Phaser.Scene{
    constructor(){
        super({key: 'Menu'});
    }

    preload(){
  this.add.image(400, 300, 'background');
    }

  create(){
  this.add.text(250, 200, 'Jogo de Light Novel', { fontFamily: 'Arial', fontSize: 48, color: '#000000' });
  
  this.add.text(250, 300, 'Escolha uma opção:', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });

    // Adicionar opção A
    const choiceAText = this.add.text(250, 350, 'Opção A', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });
    choiceAText.setInteractive();
    choiceAText.on('pointerdown', () => {
      choiceASelected = true;
      this.scene.switch('MainScene');
    });
  
    // Adicionar opção B
    const choiceBText = this.add.text(250, 400, 'Opção B', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });
    choiceBText.setInteractive();
    choiceBText.on('pointerdown', () => {
      choiceBSelected = true;
      this.scene.switch('MainScene');
    });

  }
}


// Adicionar a cena principal ao jogo
game.scene.add('MainScene', MainScene);
game.scene.add('Menu', Menu);

