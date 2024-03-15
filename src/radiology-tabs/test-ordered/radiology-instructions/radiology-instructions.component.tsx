import React, { useState } from "react";

import {
  Button,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextArea,
} from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./radiology-instructions.scss";
import { Result } from "../../work-list/work-list.resource";

interface RadiologyInstructionsModalProps {
  order: Result;
  closeModal: () => void;
}

const RadiologyInstructionsModal: React.FC<RadiologyInstructionsModalProps> = ({
  order,
  closeModal,
}) => {
  const { t } = useTranslation();

  const [notes, setNotes] = useState("");

  return (
    <div>
      <ModalHeader
        closeModal={closeModal}
        title={t("radiologyiNSTRUCTIONS", "Radiology Tests Instructions")}
      />
      <ModalBody>
        <div className={styles.modalBody}>
          <section className={styles.section}>
            <h5 className={styles.section}>
              {/* {order?.accessionNumber} &nbsp; · &nbsp;{order?.fulfillerStatus}{" "}
                &nbsp; · &nbsp;
                {order?.orderNumber}
                &nbsp; */}
              Radiology Instructions
            </h5>
          </section>
          <br />
          <section className={styles.section}>
            <ol>
              <li>Instruction 1: Test Instruction</li>
              <li>Instruction 1: Test Instruction</li>
              <li>Instruction 1: Test Instruction</li>
              <li>Instruction 1: Test Instruction</li>
              <li>Instruction 1: Test Instruction</li>
            </ol>
          </section>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button kind="secondary" onClick={closeModal}>
          {t("cancel", "Cancel")}
        </Button>
      </ModalFooter>
    </div>
  );
};

export default RadiologyInstructionsModal;
