import React from 'react';
import DOMPurify from "isomorphic-dompurify";
import styles from './styles.module.css';

type Props = {
    data: string;
}

export default function FeedbackCard({ data }: Props) {
    return <>
        <div className={styles.feedbackCard} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(data)}}>
        </div> 
    </>;
}