import React, { useState } from "react";
import {
  Button,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Checkbox,
  TextInput,
} from "@carbon/react";
import { useTranslation } from "react-i18next";
import styles from "./add-to-worklist-dialog.scss";
import { showNotification, showSnackbar } from "@openmrs/esm-framework";
import { UpdateOrder } from "./add-to-worklist-dialog.resource";
import { Result } from "../../work-list/work-list.resource";

interface AddRadiologyToWorklistDialogProps {
  queueId;
  order: Result;
  closeModal: () => void;
}

const AddRadiologyToWorklistDialog: React.FC<
  AddRadiologyToWorklistDialogProps
> = ({ queueId, order, closeModal }) => {
  const { t } = useTranslation();

  const [isReferredChecked, setIsReferredChecked] = useState(false);
  const [referredLocation, setReferredLocation] = useState("");

  const pickLabRequestQueue = async (event) => {
    event.preventDefault();
    const body = {
      fulfillerStatus: "IN_PROGRESS",
      fulfillerComment: "Radiology",
    };
    console.log("body", body);

    UpdateOrder(order.uuid, body).then(
      () => {
        showSnackbar({
          isLowContrast: true,
          title: t("pickedAnOrder", "Picked an order"),
          kind: "success",
          subtitle: t(
            "pickSuccessfully",
            "You have successfully picked an Order"
          ),
        });
        closeModal();
      },
      (error) => {
        showNotification({
          title: t(`errorPicking an order', 'Error Picking an Order`),
          kind: "error",
          critical: true,
          description: error?.message,
        });
      }
    );
  };

  const handleCheckboxChange = () => {
    setIsReferredChecked(!isReferredChecked);
  };

  return (
    <div>
      <Form onSubmit={pickLabRequestQueue}>
        <ModalHeader
          closeModal={closeModal}
          title={t("pickRadiologyLabRequest", "Pick Lab Request")}
        />
        <ModalBody>
          <div className={styles.modalBody}>
            <section className={styles.section}>
              <Checkbox
                checked={isReferredChecked}
                onChange={handleCheckboxChange}
                labelText={"Referred"}
                id="test-referred"
              />
              {isReferredChecked && (
                <TextInput
                  type="text"
                  id="referredLocation"
                  labelText={"Enter Referred Location"}
                  value={referredLocation}
                  onChange={(e) => setReferredLocation(e.target.value)}
                />
              )}
            </section>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button kind="secondary" onClick={closeModal}>
            {t("cancel", "Cancel")}
          </Button>
          <Button type="submit" onClick={pickLabRequestQueue}>
            {t("pickPatient", "Pick Lab Request")}
          </Button>
        </ModalFooter>
      </Form>
    </div>
  );
};

export default AddRadiologyToWorklistDialog;
