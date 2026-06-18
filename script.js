const SENHA='codemarica';

const OPCOES=[
'Opção 1','Opção 2','Opção 3','Opção 4','Opção 5','Opção 6'
];

const canvas=document.getElementById('wheel');
const ctx=canvas.getContext('2d');
let angle=0;
let spinning=false;

function entrar(){
 const s=document.getElementById('senha').value;
 if(s===SENHA){
   document.getElementById('login').classList.add('hidden');
   document.getElementById('app').classList.remove('hidden');
 }else{
   document.getElementById('erro').innerText='Senha inválida';
 }
}

function drawWheel(){
 const radius=250;
 const slice=(Math.PI*2)/OPCOES.length;
 ctx.clearRect(0,0,500,500);

 OPCOES.forEach((opt,i)=>{
   ctx.beginPath();
   ctx.moveTo(250,250);
   ctx.arc(250,250,radius,i*slice+angle,(i+1)*slice+angle);
   ctx.closePath();
   ctx.fillStyle=`hsl(${i*360/OPCOES.length},70%,60%)`;
   ctx.fill();

   ctx.save();
   ctx.translate(250,250);
   ctx.rotate(i*slice+slice/2+angle);
   ctx.fillStyle='#000';
   ctx.font='16px Arial';
   ctx.fillText(opt,120,5);
   ctx.restore();
 });
}

drawWheel();

document.getElementById('spin').addEventListener('click',()=>{
 if(spinning) return;
 spinning=true;

 let velocity=Math.random()*0.35+0.45;

 const timer=setInterval(()=>{
   angle+=velocity;
   velocity*=0.985;
   drawWheel();

   if(velocity<0.002){
      clearInterval(timer);
      spinning=false;

      const slice=(Math.PI*2)/OPCOES.length;
      let normalized=(Math.PI*1.5-angle)%(Math.PI*2);
      if(normalized<0) normalized+=Math.PI*2;

      const index=Math.floor(normalized/slice)%OPCOES.length;

      document.getElementById('resultado').innerText='Resultado: '+OPCOES[index];
   }
 },16);
});