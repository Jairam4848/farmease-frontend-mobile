import { type ComponentProps, type Ref, useId, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { authColors as c } from "./auth-theme";

type AuthFieldProps = ComponentProps<typeof TextInput> & {
  label: string;
  error?: string;
  hint?: string;
  password?: boolean;
  inputRef?: Ref<TextInput>;
};

function FieldIcon({ kind }: { kind: "email" | "password" | "name" }) {
  return (
    <View
      style={styles.iconSlot}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
    >
      <View style={styles.icon}>
        {kind === "email" ? (
          <View style={styles.envelope}>
            <View style={styles.envelopeFold} />
          </View>
        ) : kind === "password" ? (
          <>
            <View style={styles.lockLoop} />
            <View style={styles.lockBody}>
              <View style={styles.keyhole} />
            </View>
          </>
        ) : (
          <>
            <View style={styles.personHead} />
            <View style={styles.personBody} />
          </>
        )}
      </View>
    </View>
  );
}

function VisibilityIcon({ visible }: { visible: boolean }) {
  return (
    <View
      style={styles.eyeIcon}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      pointerEvents="none"
    >
      <View style={styles.eyeOutline}>
        <View style={styles.eyePupil} />
      </View>
      {!visible && <View style={styles.eyeSlash} />}
    </View>
  );
}

export function AuthField({
  label,
  error,
  hint,
  password = false,
  inputRef,
  style,
  ...props
}: AuthFieldProps) {
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const fieldId = useId();
  return (
    <View style={styles.field}>
      <Text
        style={[
          styles.label,
          focused && styles.labelFocused,
          !!error && styles.errorLabel,
        ]}
      >
        {label}
      </Text>
      <View
        nativeID={`farmease-auth-field-${fieldId}`}
        style={[
          styles.inputRow,
          focused && styles.focused,
          !!error && styles.invalid,
          focused && !!error && styles.invalidFocused,
          props.editable === false && styles.disabled,
        ]}
      >
        <FieldIcon
          kind={
            password
              ? "password"
              : props.keyboardType === "email-address"
                ? "email"
                : "name"
          }
        />
        <TextInput
          {...props}
          ref={inputRef}
          nativeID={`farmease-auth-input-${fieldId}`}
          accessibilityLabel={label}
          accessibilityHint={error ?? hint}
          placeholderTextColor="#86917F"
          selectionColor={c.ink}
          underlineColorAndroid="transparent"
          secureTextEntry={password ? !visible : props.secureTextEntry}
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          style={[styles.input, style]}
        />
        {password && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            disabled={props.editable === false}
            onPress={() => setVisible((current) => !current)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={({ pressed }) => [
              styles.toggle,
              pressed && styles.togglePressed,
            ]}
          >
            <VisibilityIcon visible={visible} />
          </Pressable>
        )}
      </View>
      {error ? (
        <Text accessibilityRole="alert" style={styles.error}>
          {error}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: {
    color: c.muted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
    marginLeft: 2,
  },
  labelFocused: { color: c.ink },
  errorLabel: { color: c.error },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#CBD5C2",
    borderRadius: 12,
    backgroundColor: c.white,
  },
  focused: {
    borderColor: "#64834B",
    backgroundColor: c.white,
    boxShadow: "0 0 0 3px rgba(100, 131, 75, 0.16)",
  },
  invalid: { borderColor: c.error, backgroundColor: "#FFF8F4" },
  invalidFocused: { boxShadow: "0 0 0 3px rgba(162, 50, 48, 0.12)" },
  disabled: { opacity: 0.6 },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 46,
    color: c.ink,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 12,
    paddingVertical: 9,
    borderWidth: 0,
    backgroundColor: "transparent",
    borderRadius: 0,
    outlineWidth: 0,
  },
  toggle: {
    minHeight: 44,
    minWidth: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    marginRight: 3,
    borderRadius: 10,
  },
  togglePressed: { backgroundColor: "#E8EDDD" },
  eyeIcon: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeOutline: {
    width: 17,
    height: 17,
    borderWidth: 1.5,
    borderColor: "#526E45",
    borderTopLeftRadius: 13,
    borderBottomRightRadius: 13,
    transform: [{ rotate: "45deg" }],
    alignItems: "center",
    justifyContent: "center",
  },
  eyePupil: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1.5,
    borderColor: "#526E45",
  },
  eyeSlash: {
    position: "absolute",
    width: 1.5,
    height: 26,
    borderRadius: 1,
    backgroundColor: "#526E45",
    transform: [{ rotate: "-45deg" }],
  },
  iconSlot: { width: 34, alignItems: "flex-end", justifyContent: "center" },
  icon: { width: 20, height: 20 },
  envelope: {
    position: "absolute",
    left: 1,
    top: 4,
    width: 18,
    height: 13,
    borderWidth: 1.3,
    borderColor: "#718765",
    borderRadius: 3,
    overflow: "hidden",
  },
  envelopeFold: {
    position: "absolute",
    width: 11,
    height: 11,
    top: -7,
    left: 2,
    borderRightWidth: 1.3,
    borderBottomWidth: 1.3,
    borderColor: "#718765",
    transform: [{ rotate: "45deg" }],
  },
  lockLoop: {
    position: "absolute",
    width: 10,
    height: 10,
    left: 5,
    top: 1,
    borderWidth: 1.3,
    borderColor: "#718765",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  lockBody: {
    position: "absolute",
    width: 16,
    height: 12,
    left: 2,
    top: 8,
    borderWidth: 1.3,
    borderColor: "#718765",
    borderRadius: 3,
    backgroundColor: "#E8EDDD",
    alignItems: "center",
    justifyContent: "center",
  },
  keyhole: { width: 2, height: 4, borderRadius: 1, backgroundColor: "#718765" },
  personHead: {
    position: "absolute",
    width: 8,
    height: 8,
    left: 6,
    top: 1,
    borderWidth: 1.3,
    borderColor: "#718765",
    borderRadius: 4,
  },
  personBody: {
    position: "absolute",
    width: 16,
    height: 9,
    left: 2,
    top: 11,
    borderWidth: 1.3,
    borderColor: "#718765",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  error: { color: c.error, fontSize: 12, lineHeight: 17 },
  hint: { color: c.muted, fontSize: 11, lineHeight: 16 },
});
