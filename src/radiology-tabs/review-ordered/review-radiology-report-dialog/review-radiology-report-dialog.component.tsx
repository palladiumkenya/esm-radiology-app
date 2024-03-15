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
import styles from "./review-radiology-report-dialog.scss";
import { Result } from "../../work-list/work-list.resource";
import { showNotification, showSnackbar } from "@openmrs/esm-framework";
import { updateOrder } from "../../test-ordered/pick-radiology-order/add-to-worklist-dialog.resource";

interface ReviewOrderDialogProps {
  order: Result;
  closeModal: () => void;
}

const ReviewOrderDialog: React.FC<ReviewOrderDialogProps> = ({
  order,
  closeModal,
}) => {
  const { t } = useTranslation();

  const [notes, setNotes] = useState("");

  const rejectOrder = async (event) => {
    event.preventDefault();

    const payload = {
      fulfillerStatus: "DECLINED",
      fulfillerComment: notes,
    };
    updateOrder(order.uuid, payload).then(
      (resp) => {
        showSnackbar({
          isLowContrast: true,
          title: t("rejectOrder", "Rejected Order"),
          kind: "success",
          subtitle: t(
            "successfullyrejected",
            `You havRejectOrdere successfully rejected an Order with OrderNumber ${order.orderNumber} `
          ),
        });
        closeModal();
        window.location.reload();
      },
      (err) => {
        showNotification({
          title: t(`errorRejecting order', 'Error Rejecting a order`),
          kind: "error",
          critical: true,
          description: err?.message,
        });
      }
    );
  };

  return (
    <div>
      <Form onSubmit={rejectOrder}>
        <ModalHeader
          closeModal={closeModal}
          title={t("reviewReport", "Review Radilogy Report")}
        />
        <ModalBody>
          <div className={styles.modalBody}>
            <section className={styles.section}>
              <h5 className={styles.section}>
                {order?.accessionNumber} &nbsp; · &nbsp;{order?.fulfillerStatus}{" "}
                &nbsp; · &nbsp;
                {order?.orderNumber}
                &nbsp;
              </h5>
            </section>
            <br />
            <section className={styles.section}>
              <TextArea
                labelText={t("nextNotes", "Reviewer's notes ")}
                id="nextNotes"
                name="nextNotes"
                onChange={(e) => setNotes(e.target.value)}
              />
            </section>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button kind="danger" type="submit">
            {t("rejectOrder", "Reject Report")}
          </Button>
          <Button kind="primary" onClick={closeModal}>
            {t("cancel", "Approve")}
          </Button>
        </ModalFooter>
      </Form>
    </div>
  );
};

export default ReviewOrderDialog;
