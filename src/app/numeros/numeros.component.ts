import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonCardSubtitle,
  IonCardHeader, 
  IonCardTitle, 
  IonCard,
  IonItem, 
  IonLabel, 
  IonInput,
  IonButton, 
  IonList,
  IonContent, } from '@ionic/angular/standalone';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-numeros',
  standalone: true,
  imports: [
    IonButton,
    IonInput, 
    IonLabel, 
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonItem,
    IonList,
    CommonModule,
    FormsModule
  ],
  templateUrl: './numeros.component.html',
  styleUrls: ['./numeros.component.scss'],
})
export class NumerosComponent {

  numeroIngresado!: number;
  numeros: number[] = [];
  resultados: { valor: number; color: string; multiplos: number[] }[] = [];
  @ViewChild(IonContent) content!: IonContent

  private firestore = inject(Firestore);

  calcular() {
    // convierte el valor del input a number 
    const numeroConvertido = Number(this.numeroIngresado);
    // crea un array cde n longitud, tomando el valor de "n" como el número ingresado
    // llena ese array con consecutivos empezando en cero y terminando en "n"
    this.numeros = Array.from({ length: numeroConvertido + 1 }, (_, i) => i);
    // mapea el arreglo para crear objetos en base al cociente de los números 3 / 5 / 7
    this.resultados = this.numeros.map(num => {
      const multiplos: number[] = [];
      if (num % 3 === 0) multiplos.push(3);
      if (num % 5 === 0) multiplos.push(5);
      if (num % 7 === 0) multiplos.push(7);

      // asigna los colores correspondientes a los objetos de los numeros
      let color = 'black';
      if (multiplos.includes(3)) color = 'green';
      if (multiplos.includes(5) && color !== 'green') color = 'red';
      if (multiplos.includes(7) && color !== 'green' && color !== 'red') color = 'blue';

      return { valor: num, color, multiplos };
    });


    //hace una petición http a firestore creando una nueva colección y enviándola a la BD
    const resultadosCollection = collection(this.firestore, 'resultados');
    addDoc(resultadosCollection, {
      numeroIngresado: this.numeroIngresado,
      resultados: this.resultados
    }).then(() => {
      console.log('Datos guardados en Firestore');
    }).catch(error => {
      console.error('Error al guardar en Firestore: ', error);
    });

    this.numeroIngresado = 0;
  };

}
