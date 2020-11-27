alert("Olá, você foi convocado para ser o novo membro da tropa dos Holandeses, você deve chegar a praia desviando dos portugueses, para isso use a  ⬆ e a ⬇, cada vez que você anda , mais vão aparecer , boa sorte!")
const LARGURA_CANVAS = 1300
const ALTURA_CANVAS = 675
class Sprite {
    constructor(x, y, largura, altura, imagem) {
        this.x = x
        this.y = y
        this.largura = largura
        this.altura = altura
        this.imagem = imagem
        }
        cria(ctx) {
            if (this.imagem) {
                ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura)
            }
            else {
                ctx.fillRect(this.x, this.y, this.largura, this.altura)
            }
        }

        get centro() {
            return {
                x: this.x + this.largura / 2,
                y: this.y + this.altura / 2
            }
        }

        batercom(outraSprite) {
            let c1 = Math.abs(outraSprite.centro.x - this.centro.x)
            let c2 = Math.abs(outraSprite.centro.y - this.centro.y)
            let h = Math.sqrt(c1 ** 2 + c2 ** 2)
            let r1 = this.altura / 2
            let r2 = outraSprite.altura / 2

            return h <= r1 + r2
        }
}

class Inimigo extends Sprite {
            constructor() {
                super(1300, posição, 80, 80 ,imagemInimigo)
                this.velocidadeX = 5 * Math.random() + 3
            }

            andar() {
                this.x -= this.velocidadeX

                if (this.x <= -80) {
                    this.x = 1300
                    this.y = posição
                    passardefase()
                }
            }
            morrer() {
                this.x = 1300
                this.y = posição
            }

    }
 
let canvasEl = document.querySelector('#jogo')
let ctx = canvasEl.getContext('2d')
let barradevidas = 1300
let inimigomorreu = 0
let novafase = 3
let posição
let imagemHolandes = new Image()
imagemHolandes.src = "images/Barco.png"
let holandes = new Sprite(128,128,100,100,imagemHolandes)
let imagemInimigo = new Image()
imagemInimigo.src = "images/Inimigo.png"
let inimigos = []
var fundoImg = new Image()
fundoImg.src = "../images/Background-Holanda.png";
inimigos.push(new Inimigo())
inimigos.push(new Inimigo())
inimigos.push(new Inimigo())


imagemHolandes.addEventListener('load', (evento) => {
    recria()
})

document.addEventListener('keydown',(evento) => {
    if(evento.key == 'ArrowUp'){
        if(holandes.y>128)
            holandes.y -= 128
    }
    else if(evento.key == 'ArrowDown'){
        if(holandes.y<ALTURA_CANVAS-228)
            holandes.y += 128
    }
    recria()
})

function recria(){
    ctx.clearRect(0,0,1300,675)
    ctx.drawImage(fundoImg, 0, 0)
    holandes.cria(ctx)
    for (let inimigo of inimigos){
        inimigo.cria(ctx)
    }
    posição = (1+Math.floor(Math.random() * 4)) * 128
    ctx.fillStyle = "#00ff00"
    ctx.fillRect(0,0,barradevidas,100)
}

function atualizar(){
    for(let inimigo of inimigos){
        inimigo.andar(ctx)
    }
}

function passardefase(){
    inimigomorreu++
    if(novafase==inimigomorreu){
        novafase = novafase + (inimigomorreu*2)
        holandes.x+=320
        inimigos.push(new Inimigo)
        if(holandes.x>=1300){
            alert("VOCÊ GANHOU!")
            window.location.reload()
        }
        recria()
    }
}

function jogar(){
    recria()
    atualizar()
    verificasebateu()
}

function verificasebateu() {

    for (let inimigo of inimigos) {
        const atingiuHolandes = inimigo.batercom(holandes)
        if (atingiuHolandes) {
            inimigo.morrer() 
            barradevidas -= 434
            if(barradevidas<-434){
                recria()
                alert("Game over!")
                window.location.reload()
            }
       }
    }
}
setInterval(()=>{
    jogar()
},33)