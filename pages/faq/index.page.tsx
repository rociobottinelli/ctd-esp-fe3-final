import { NextPage } from "next";
import Head from "next/head";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { faqsData } from "dh-marvel/components/faqs/faqsData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Marvel | Digital House</title>
        <meta
          name="description"
          content="Respuesta a preguntas frecuentes sobre nuestro sistema de ventas"
        />
      </Head>
      <Box sx={{ maxWidth: 1600 }} px={4}>
        <Typography
          variant="h2"
          gutterBottom
          style={{
            marginTop: "30px",
            fontWeight: "bold",
            fontSize: "38px",
            textAlign: "center",
          }}
        >
          Preguntas Frecuentes
        </Typography>
        {faqsData.map((question) => {
          return (
            <Accordion key={question.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography style={{ fontWeight: "bold" }}>
                  {question.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography style={{ fontStyle: "oblique" }}>
                  {question.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    </div>
  );
};

export default Faq;
