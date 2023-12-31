import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from './styles.module.css';
import SVGImage from './Tick.svg';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

const ResultPage = () => {
    const { responses } = useParams();
    const [VPercent, setVPercent] = useState();
    const [APercent, setAPercent] = useState();
    const [RPercent, setRPercent] = useState();
    const [KPercent, setKPercent] = useState();
    const [maxResult, setMaxResult] = useState("");
    const [cookies, setCookie] = useCookies(['user'])

    useEffect(() => {
        var arrResult = [];
        for (let i in responses) {
            arrResult.push(responses[i])
        }
        var countA = 0, countR = 0, countV = 0, countK = 0;
        for (let i = 0; i < arrResult.length; i++) {
            if (arrResult[i] === "K")
                countK++;
            else if (arrResult[i] === "A")
                countA++;
            else if (arrResult[i] === "R")
                countR++;
            else if (arrResult[i] === "V")
                countV++;
        }

        setVPercent(countV / 16 * 100);
        setAPercent(countA / 16 * 100);
        setRPercent(countR / 16 * 100);
        setKPercent(countK / 16 * 100);

        var max = 0;
        setMaxResult("Visual");
        if (countV > max) {
            max = countV;
            setMaxResult("Visual");
        }
        if (countA > max) {
            max = countA;
            setMaxResult("Aural")
        }
        if (countR > max) {
            max = countR;
            setMaxResult("Reading / Writing");
        }
        if (countK > max) {
            max = countK;
            setMaxResult("Kinesthetic")
        }
    }, [responses])

    useEffect(() => {
        if (cookies && cookies.user) {
            const id = cookies.user._id
            const object = {
                learningStyle: maxResult
            };

            try {
                axios.put(`http://localhost:5000/user/${id}`, object)
                    .then(response => {
                        console.log('Success')
                    })
                    .else(() => {
                        console.log('Error')
                    })
            } catch (err) {
                console.log(err.message)
            }
        }
    }, [maxResult, cookies.user])

    return (
        <div className={styles.resultPageMainDiv}>
            <header>
                <h1>Learning Style Test Result</h1>
            </header>
            <div className={styles.box1}>
                <div className={styles.box2}>
                    <h1>Result :</h1>
                    <img src={SVGImage} alt="TickSVG" />
                    <div id={styles.result}>Your predicted learning style is: {maxResult}</div>
                </div>

                <div className={styles.box3}>
                    <h1>Observation</h1>
                    <div className={styles.box4}>
                        <div id={styles.visual}><b>Visual: {VPercent}%</b></div>
                        <div id={styles.aural}><b>Aural: {APercent}%</b></div>
                        <div id={styles.reading}><b>Reading / Writing: {RPercent}%</b></div>
                        <div id={styles.kinesthetic}><b>Kinesthetic: {KPercent}%</b></div>
                    </div>
                </div>
            </div>
            <Link to='/student'><button>Home</button></Link>
        </div>
    )
}

export default ResultPage