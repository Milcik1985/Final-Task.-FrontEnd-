import React, { useEffect, useState } from "react";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import styles from "../styles/Home.module.css";

const Index = () => {
  return (
    <PageTemplate>
      <div className={styles.homePage}>
        <div className={styles.homePageContent}>
          <h1>Welcome To Variuos Questions And Answers Page</h1>
          <p className={styles.paragraph}>
            Here ere You can post any question, from any field, and get even
            more than one answer. People knowing everything gathers here from
            whole world! Check out the links above and get started!
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Index;

// Baigiamasis projektas

// Šio projekto metu reikės sukurti internetinį forumą naudojant React, NodeJS Express ir MongoDB arba MySQL. Forumo tikslas - leisti užduoti klausimus, į juos atsakinėti bei žymėti patinkančius arba nepatinkančius atsakymus. Galite įsivaizduoti kažką panašaus į https://stackoverflow.com/questions, tik jums rekės padaryt supaprastintą versiją.

// Funkcionalumas:
// - Registruotis
// - Prisijungti
// - Užduoti naują klausimą (tik prisijungus)
// - Ištrinti klausimą (tik prisiijungus)
// - Atsakyti į užduotą klausimą (tik prisijungus) // EXTRA
// - Ištrinti atsakymą (tik prisijungus) // EXTRA
// - Žymėti/atžymėti patinkačius ir nepatinkančius atsakymus (like/dislike) (tik prisijungus)
// - Peržiūrėti klausimų sąrašą.
// - Filtruoti į atsakytus arba neatsakytus klausimus // EXTRA
// - Peržiūrėti klausimų atsakymus

// Forumo projektas sudeda iš frontend'o ir backend'o dalių:
// Backend'e naudosime NodeJS Express, MongoDB arba MySQL ir kelis papildomus npm paketus, kuries palengvins darbą.
// Frontend'e naudosime React. Kaip ir backend'e node express, taip pat galima naudoti papildomjus npm paketus.

// ### Backend'as

// POST /register
// POST /login

// GET /questions
// POST /question
// DELETE /question/:id

// GET /question/:id/answers
// POST /question/:id/answers
// DELETE /answer/:id

// ### Frontend'as

// Frontend'as neturi nustatyto dizaino , kurį reikia atkartoti. Tačiau jum tenka sunkesnė užduotis - patiems sugalvoti ir sukurti puslapio dizainą. Svarbiausia išpildyti visus funkcinius reikalavimus ir validuoti vartotojo įvedamus duomenis.

// Puslapis turi gerai atrodyt tiek ant kompiuterinės tiek ant telefono versijos.

// Užduoties įkėlimo instrukcijos

// 1. Sukurti GitHub repozitoriją.

// 2.!!! Kiekvienos paskaitos metu ar darant užuoti koda pushint bent 2 kartus per paskaitą.  !!!

// 3. Galutine kodo versija pasidalinti su dėstytoju.

// Sėkmės!

// * Galutinio atsiskaitymo metu bus atsižvelgiama į:
// - Kodo kokybę;
// - Gerasias programavimo praktikas;
// - Funkcinius reikalavimus;
// - Bendrą web poslapio vaizdą;
// - Programuotojo žinias kurios buvo pritaikytos užduoties atlikimui;

// user: email, password, name,  id,

// question: question_text, date, id,  user_id

// answer: id, answer_text, date, gained_likes_number, question_id
